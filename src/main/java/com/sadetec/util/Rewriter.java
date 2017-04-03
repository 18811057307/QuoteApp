package com.sadetec.util;
import static java.lang.String.format;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public abstract class Rewriter {
    private Pattern pattern;
    private Matcher matcher;

    public Rewriter(String regularExpression) {
        this.pattern = Pattern.compile(regularExpression);
    }

    public String group(int i) {
        return matcher.group(i);
    }

    public abstract String replacement() throws Exception;

    public String rewrite(CharSequence original) {
        return rewrite(original, new StringBuffer(original.length())).toString();
    }

    public StringBuffer rewrite(CharSequence original, StringBuffer destination) {
        try {
            this.matcher = pattern.matcher(original);
            while (matcher.find()) {
                matcher.appendReplacement(destination, "");
                destination.append(replacement());
            }
            matcher.appendTail(destination);
            return destination;
        } catch (Exception e) {
            throw new RuntimeException("Cannot rewrite " + toString(), e);
        }
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(pattern.pattern());
        for (int i = 0; i <= matcher.groupCount(); i++)
            sb.append(format("\n\t(%s) - %s", i, group(i)));
        return sb.toString();
    }
}